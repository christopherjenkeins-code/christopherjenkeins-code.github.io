/* pages.js – extras for contact.html and enquiry.html. Load AFTER main.js.
   main.js already handles: fade-in observer, #opening-status badge, open-now
   badge, form validation + confirmation, header search, year, back-to-top.
   This file adds: today's hours highlight, copy buttons, character counters,
   booking progress bar, quick time picks and a live booking summary. */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Shared: South African time ---------- */
  function saNow() {
    try {
      const m = {};
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Johannesburg', weekday: 'short', hour: '2-digit', hour12: false
      }).formatToParts(new Date()).forEach(p => { m[p.type] = p.value; });
      const d = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { day: d[m.weekday], hour: parseInt(m.hour, 10) % 24 };
    } catch (e) { const n = new Date(); return { day: n.getDay(), hour: n.getHours() }; }
  }

  /* ---------- Shared: live character counter ---------- */
  function counter(fieldId, countId) {
    const field = document.getElementById(fieldId);
    const out = document.getElementById(countId);
    if (!field || !out) return;
    const max = field.maxLength;
    const update = () => { out.textContent = field.value.length + ' / ' + max; };
    field.addEventListener('input', update);
    field.form && field.form.addEventListener('reset', () => setTimeout(update, 0));
    update();
  }

  /* =========================== CONTACT PAGE =========================== */

  // Highlight today's opening hours (Fri/Sat trading runs past midnight to 02:00)
  const rows = document.querySelectorAll('.hours-row');
  function markToday() {
    if (!rows.length) return;
    const n = saNow();
    const day = (n.hour < 2 && (n.day === 6 || n.day === 0)) ? (n.day + 6) % 7 : n.day;
    rows.forEach(r => {
      const isToday = r.dataset.days.split(',').map(Number).includes(day);
      r.classList.toggle('today', isToday);
      let tag = r.querySelector('.today-tag');
      if (isToday && !tag) {
        tag = document.createElement('span');
        tag.className = 'today-tag';
        tag.textContent = 'Today';
        r.appendChild(tag);
      } else if (!isToday && tag) { tag.remove(); }
    });
  }
  markToday();
  setInterval(markToday, 60000);

  // Copy buttons on address, phone, WhatsApp and email
  document.querySelectorAll('[data-copy]').forEach(el => {
    const label = el.querySelector('strong') ? el.querySelector('strong').textContent.replace(':', '') : 'details';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy ' + label);
    btn.addEventListener('click', () => {
      const text = el.dataset.copy;
      const flash = msg => {
        btn.textContent = msg;
        btn.classList.add('done');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => flash('Copied!'), () => flash('Copy failed'));
      } else {
        const t = document.createElement('textarea');
        t.value = text; document.body.appendChild(t); t.select();
        let ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
        t.remove(); flash(ok ? 'Copied!' : 'Copy failed');
      }
    });
    el.appendChild(btn);
  });

  counter('contact-message', 'contact-count');

  /* ========================== ENQUIRY PAGE ============================ */
  const form = document.getElementById('reservation-form');
  if (!form) return;

  counter('message', 'message-count');

  const LAST_BOOKING = { 0: 21, 1: 23, 2: 23, 3: 23, 4: 23, 5: 23, 6: 23 };
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const f = {
    name: document.getElementById('fullname'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    date: document.getElementById('res-date'),
    time: document.getElementById('res-time'),
    guests: document.getElementById('guests')
  };
  const progress = document.getElementById('form-progress');
  const chips = document.getElementById('time-chips');
  const hint = document.getElementById('time-hint');
  const summary = document.getElementById('booking-summary');

  // Progress bar
  const fieldList = [f.name, f.email, f.phone, f.date, f.time, f.guests];
  progress.innerHTML = '<div class="progress-text"></div><div class="progress-track"><div class="progress-fill"></div></div>';
  const progText = progress.querySelector('.progress-text');
  const progFill = progress.querySelector('.progress-fill');
  function updateProgress() {
    const done = fieldList.filter(el => el.value.trim() !== '').length;
    progText.textContent = done === fieldList.length
      ? 'All details filled in \u2013 ready to send'
      : done + ' of ' + fieldList.length + ' required details done';
    progFill.style.width = (done / fieldList.length * 100) + '%';
    progress.classList.toggle('complete', done === fieldList.length);
  }

  // Quick time picks for the chosen date
  function dayFromDate(value) {
    const p = value.split('-');
    return new Date(p[0], p[1] - 1, p[2]).getDay();
  }
  function buildChips() {
    chips.innerHTML = '';
    if (!f.date.value) { hint.textContent = 'Pick a date to see available times.'; return; }
    const day = dayFromDate(f.date.value);
    const last = LAST_BOOKING[day];
    hint.textContent = DAYS[day] + ' bookings: 12:00 to ' + last + ':00 (last booking).';
    [12, 14, 17, 19, 20, 21, 22, 23].filter(h => h <= last).forEach(h => {
      const value = (h < 10 ? '0' : '') + h + ':00';
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (f.time.value === value ? ' active' : '');
      b.textContent = value;
      b.addEventListener('click', () => {
        f.time.value = value;
        f.time.dispatchEvent(new Event('input', { bubbles: true }));
      });
      chips.appendChild(b);
    });
  }
  function highlightChip() {
    chips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.textContent === f.time.value));
  }

  // Live summary
  function updateSummary() {
    const bits = [];
    if (f.guests.value) bits.push('a table for ' + f.guests.options[f.guests.selectedIndex].text);
    if (f.date.value) {
      const p = f.date.value.split('-');
      bits.push('on ' + new Date(p[0], p[1] - 1, p[2]).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }));
    }
    if (f.time.value) bits.push('at ' + f.time.value);
    if (!bits.length) { summary.hidden = true; return; }
    const first = f.name.value.trim().split(' ')[0];
    summary.textContent = 'Your request' + (first ? ', ' + first : '') + ': ' + bits.join(' ') + '.';
    summary.hidden = false;
  }

  function refresh() { updateProgress(); updateSummary(); highlightChip(); }

  f.date.addEventListener('input', () => { buildChips(); refresh(); });
  f.date.addEventListener('change', () => { buildChips(); refresh(); });
  fieldList.forEach(el => { el.addEventListener('input', refresh); el.addEventListener('change', refresh); });
  form.addEventListener('reset', () => setTimeout(() => { buildChips(); refresh(); }, 0));

  buildChips();
  refresh();
});
