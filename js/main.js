/* ==========================================================
   THE SOPRANOS RESTAURANT & LOUNGE - main.js
   Version 1.4.0
   Features:
      1. Footer year
      2. Mobile nav closes after a link is tapped
      3. Back-to-top button
      4. "Open now / Closed" badge (South African time)
      5. Reservation form validation + confirmation (enquiry.html)
      6. Contact form validation + confirmation (contact.html)
      7. Global Header Search (Page redirection & keyword filtering)
   ========================================================== */
(function () {
    "use strict";

    /* ---------- Opening hours (24h clock; close > 24 = after midnight) ---------- */
    // 0 = Sunday ... 6 = Saturday
    var HOURS = {
        0: { open: 12, close: 22 },  // Sunday
        1: { open: 12, close: 24 },  // Monday
        2: { open: 12, close: 24 },  // Tuesday
        3: { open: 12, close: 24 },  // Wednesday
        4: { open: 12, close: 24 },  // Thursday
        5: { open: 12, close: 26 },  // Friday  (until 02:00 Saturday)
        6: { open: 12, close: 26 }   // Saturday (until 02:00 Sunday)
    };
    var LAST_BOOKING = { 0: 21, 1: 23, 2: 23, 3: 23, 4: 23, 5: 23, 6: 23 };
    var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    /* Current time in Johannesburg, regardless of the visitor's device timezone */
    function getSATime() {
        try {
            var parts = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Africa/Johannesburg",
                weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
            }).formatToParts(new Date());
            var map = {};
            parts.forEach(function (p) { map[p.type] = p.value; });
            var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
            return { day: days[map.weekday], minutes: (parseInt(map.hour, 10) % 24) * 60 + parseInt(map.minute, 10) };
        } catch (e) {
            var d = new Date();
            return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
        }
    }

    function isOpenNow() {
        var now = getSATime();
        var today = HOURS[now.day];
        if (now.minutes >= today.open * 60 && now.minutes < Math.min(today.close, 24) * 60) {
            return { open: true, until: today.close };
        }
        // Spill-over from the previous night (Fri/Sat close at 02:00)
        var prev = HOURS[(now.day + 6) % 7];
        if (prev.close > 24 && now.minutes < (prev.close - 24) * 60) {
            return { open: true, until: prev.close };
        }
        return { open: false, until: null };
    }

    function formatHour(h) {
        var hh = h % 24;
        return (hh < 10 ? "0" : "") + hh + ":00";
    }

    /* ---------- 1. Footer year ---------- */
    function setYear() {
        var el = document.getElementById("year");
        if (el) { el.textContent = new Date().getFullYear(); }
    }

    /* ---------- 2. Close mobile nav after tapping a link ---------- */
    function initNav() {
        var toggle = document.getElementById("nav-toggle");
        if (!toggle) { return; }
        document.querySelectorAll(".navbar a").forEach(function (link) {
            link.addEventListener("click", function () { toggle.checked = false; });
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") { toggle.checked = false; }
        });
    }

    /* ---------- 3. Back-to-top button ---------- */
    function initBackToTop() {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "back-to-top";
        btn.setAttribute("aria-label", "Back to top");
        btn.innerHTML = "&uarr;";
        document.body.appendChild(btn);

        window.addEventListener("scroll", function () {
            btn.classList.toggle("visible", window.scrollY > 400);
        });
        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------- 4. Open now / Closed badge ---------- */
    function initOpenStatus() {
        var els = document.querySelectorAll("#open-status");
        if (!els.length) { return; }
        function render() {
            var s = isOpenNow();
            els.forEach(function (el) {
                el.classList.toggle("is-open", s.open);
                el.classList.toggle("is-closed", !s.open);
                el.textContent = s.open
                    ? "\u25CF Open now \u2013 until " + formatHour(s.until)
                    : "\u25CF Closed right now \u2013 opens daily at 12:00";
            });
        }
        render();
        setInterval(render, 60000);
    }

    /* ---------- Shared form helpers ---------- */
    function showStatus(box, message, type) {
        box.textContent = message;
        box.className = "form-status " + type;
    }

    function fail(box, field, message) {
        showStatus(box, message, "error");
        if (field) {
            field.classList.add("invalid");
            field.focus();
            field.addEventListener("input", function clear() {
                field.classList.remove("invalid");
                field.removeEventListener("input", clear);
            });
        }
        return false;
    }

    function isValidPhone(value) {
        // South African numbers: 0821234567 or +27821234567 (spaces/dashes allowed)
        var clean = value.replace(/[\s\-()]/g, "");
        return /^(\+27|0)\d{9}$/.test(clean);
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function todayString() {
        var d = new Date();
        var m = String(d.getMonth() + 1).padStart(2, "0");
        var day = String(d.getDate()).padStart(2, "0");
        return d.getFullYear() + "-" + m + "-" + day;
    }

    /* ---------- 5. Reservation form ---------- */
    function initReservationForm() {
        var form = document.getElementById("reservation-form");
        if (!form) { return; }
        var status = document.getElementById("form-status");
        var dateInput = document.getElementById("res-date");
        if (dateInput) { dateInput.min = todayString(); }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = form.elements["fullname"];
            var email = form.elements["email"];
            var phone = form.elements["phone"];
            var date = form.elements["res-date"];
            var time = form.elements["res-time"];
            var guests = form.elements["guests"];

            if (name.value.trim().length < 2) { return fail(status, name, "Please enter your full name."); }
            if (!isValidEmail(email.value.trim())) { return fail(status, email, "Please enter a valid email address."); }
            if (!isValidPhone(phone.value)) { return fail(status, phone, "Please enter a valid South African phone number, e.g. 082 123 4567."); }
            if (!date.value || date.value < todayString()) { return fail(status, date, "Please choose today's date or a future date."); }
            if (!time.value) { return fail(status, time, "Please choose a preferred time."); }
            if (!guests.value) { return fail(status, guests, "Please select your party size."); }

            var parts = date.value.split("-");
            var weekday = new Date(parts[0], parts[1] - 1, parts[2]).getDay();
            var t = time.value.split(":");
            var mins = parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
            var openMins = HOURS[weekday].open * 60;
            var lastMins = LAST_BOOKING[weekday] * 60;
            if (mins < openMins || mins > lastMins) {
                return fail(status, time, DAY_NAMES[weekday] + " bookings are taken between 12:00 and " + formatHour(LAST_BOOKING[weekday]) + ".");
            }

            showStatus(status,
                "Thank you, " + name.value.trim().split(" ")[0] + "! Your request for " + guests.options[guests.selectedIndex].text +
                " on " + date.value + " at " + time.value + " has been received. We will confirm by email or phone shortly.",
                "success");
            form.reset();
            status.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    /* ---------- 6. Contact form ---------- */
    function initContactForm() {
        var form = document.getElementById("contact-form");
        if (!form) { return; }
        var status = document.getElementById("contact-status");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = form.elements["name"];
            var email = form.elements["email"];
            var message = form.elements["message"];

            if (name.value.trim().length < 2) { return fail(status, name, "Please enter your name."); }
            if (!isValidEmail(email.value.trim())) { return fail(status, email, "Please enter a valid email address."); }
            if (message.value.trim().length < 10) { return fail(status, message, "Please write a message of at least 10 characters."); }

            showStatus(status, "Thanks, " + name.value.trim().split(" ")[0] + "! Your message has been sent. We will reply as soon as we can.", "success");
            form.reset();
        });
    }

    /* ---------- 7. Global Header Search Functionality ---------- */
    function initSearch() {
        var searchInput = document.getElementById("searchInput");
        var searchBtn = document.querySelector(".search-btn");

        if (!searchInput) { return; }

        function performSearch() {
            var query = searchInput.value.toLowerCase().trim();

            if (!query) {
                // If input is empty, reset any page content filtering cards back to visible
                document.querySelectorAll(".menu-card, .about-card, .service-card, .card").forEach(function (item) {
                    item.style.display = "";
                });
                return;
            }

            // Cross-page mapping keywords
            if (query.includes("menu") || query.includes("burger") || query.includes("drink") || query.includes("cocktail") || query.includes("food") || query.includes("wing")) {
                window.location.href = "menu.html";
                return;
            } else if (query.includes("service") || query.includes("event") || query.includes("vip") || query.includes("lounge") || query.includes("party")) {
                window.location.href = "services.html";
                return;
            } else if (query.includes("contact") || query.includes("address") || query.includes("map") || query.includes("hours") || query.includes("phone") || query.includes("location")) {
                window.location.href = "contact.html";
                return;
            } else if (query.includes("about") || query.includes("story") || query.includes("vision") || query.includes("who")) {
                window.location.href = "about.html";
                return;
            } else if (query.includes("reserve") || query.includes("booking") || query.includes("table") || query.includes("enquiry")) {
                window.location.href = "enquiry.html";
                return;
            }

            // Fallback to local on-page card filtering if no page keyword match was triggered
            var searchableItems = document.querySelectorAll(".menu-card, .about-card, .service-card, .card");
            var foundMatch = false;

            searchableItems.forEach(function (item) {
                var text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = "";
                    foundMatch = true;
                } else {
                    item.style.display = "none";
                }
            });

            if (!foundMatch) {
                // Optional notification if nothing matches locally or across routes
                console.log("No specific matches found for: " + query);
            }
        }

        // Event listeners for button click, 'Enter' key press, and live input filtering
        if (searchBtn) {
            searchBtn.addEventListener("click", performSearch);
        }

        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                performSearch();
            }
        });

        searchInput.addEventListener("input", performSearch);
    }

    /* ---------- Start everything once the page is ready ---------- */
    document.addEventListener("DOMContentLoaded", function () {
        setYear();
        initNav();
        initBackToTop();
        initOpenStatus();
        initReservationForm();
        initContactForm();
        initSearch();
    });
})();
