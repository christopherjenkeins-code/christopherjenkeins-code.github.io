/* menu.js – extras for menu.html. Load AFTER main.js.
   main.js already handles: fade-in observer, #opening-status badge,
   featured/events card rendering, footer year and the header search.
   This file only adds: category filters, search tidy-up (headings, empty
   message), Chef's Pick and the live cocktail-hour highlight. */
document.addEventListener('DOMContentLoaded', () => {

  const categories = [...document.querySelectorAll('.category')];
  const cards = [...document.querySelectorAll('.menu-card')];
  const specials = document.querySelector('.events');
  const featuredSec = document.getElementById('featured-section');
  const eventsSec = document.getElementById('events-section');
  const noResults = document.getElementById('no-results');
  const input = document.getElementById('searchInput');
  const toolbar = document.getElementById('menu-toolbar');
  let activeFilter = 'all';

  /* ---------- 1. Live cocktail-hour highlight (South African time) ---------- */
  function saHour() {
    try {
      return parseInt(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Johannesburg', hour: '2-digit', hour12: false
      }).format(new Date()), 10) % 24;
    } catch (e) { return new Date().getHours(); }
  }
  function updateDeal() {
    const live = saHour() >= 16 && saHour() < 19;
    const b = document.getElementById('cocktail-hour-badge');
    const r = document.getElementById('cocktail-hour-row');
    if (b) b.textContent = live ? 'Happening now \u2013 until 7 PM' : 'Everyday 4 PM \u2013 7 PM';
    if (r) r.classList.toggle('deal-live', live);
  }
  updateDeal();
  setInterval(updateDeal, 60000);

  /* ---------- 2. Stagger delay for cards ---------- */
  document.querySelectorAll('.menu-grid').forEach(grid => {
    grid.querySelectorAll('.menu-card').forEach((c, i) => c.style.setProperty('--delay', (i * 70) + 'ms'));
  });

  /* ---------- 3. Category filter buttons ---------- */
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'burgers', label: '\uD83C\uDF54 Burgers' },
    { key: 'wings', label: '\uD83C\uDF57 Wings' },
    { key: 'cocktails', label: '\uD83C\uDF79 Drinks' },
    { key: 'specials', label: '\uD83C\uDF89 Specials' }
  ];
  if (toolbar) {
    toolbar.setAttribute('role', 'group');
    toolbar.setAttribute('aria-label', 'Filter the menu');
    filters.forEach(f => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn' + (f.key === 'all' ? ' active' : '');
      b.textContent = f.label;
      b.setAttribute('aria-pressed', f.key === 'all' ? 'true' : 'false');
      b.addEventListener('click', () => {
        activeFilter = f.key;
        toolbar.querySelectorAll('.filter-btn').forEach(x => {
          x.classList.toggle('active', x === b);
          x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
        });
        applyFilters();
      });
      toolbar.appendChild(b);
    });
  }

  /* ---------- 4. Filters + search together ---------- */
  function applyFilters() {
    const q = (input ? input.value : '').trim().toLowerCase();
    let visible = 0;

    categories.forEach(cat => {
      const catOk = activeFilter === 'all' || activeFilter === cat.dataset.category;
      let n = 0;
      cat.querySelectorAll('.menu-card').forEach(card => {
        const show = catOk && (!q || card.textContent.toLowerCase().includes(q));
        card.hidden = !show;
        if (show) n++;
      });
      cat.hidden = n === 0;
      visible += n;
      if (n) { cat.classList.remove('refresh'); void cat.offsetWidth; cat.classList.add('refresh'); }
    });

    if (specials) {
      const ok = (activeFilter === 'all' || activeFilter === 'specials') &&
                 (!q || specials.textContent.toLowerCase().includes(q));
      specials.hidden = !ok;
      if (ok) visible++;
    }
    // Featured + lounge events only show when nothing is filtered or searched
    if (featuredSec) featuredSec.hidden = !(activeFilter === 'all' && !q);
    if (eventsSec) eventsSec.hidden = !((activeFilter === 'all' || activeFilter === 'specials') && !q);

    if (noResults) noResults.hidden = visible > 0;
  }
  // main.js already filters cards on input/click/Enter; this runs alongside it
  // to also handle headings, tables and the empty message.
  if (input) {
    input.addEventListener('input', applyFilters);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });
  }
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) searchBtn.addEventListener('click', applyFilters);

  /* ---------- 5. Chef's Pick ---------- */
  const pickBox = document.getElementById('chefs-pick');
  function showPick() {
    if (!pickBox || !cards.length) return;
    const card = cards[Math.floor(Math.random() * cards.length)];
    const name = card.querySelector('.item-name').textContent;
    const price = card.querySelector('.item-price').textContent;
    const desc = card.querySelector('.item-desc').textContent;

    pickBox.innerHTML = '';
    const text = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = "Can't decide? Try the " + name + ' \u2013 ' + price;
    const p = document.createElement('p');
    p.textContent = desc;
    text.append(title, p);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pick-btn';
    btn.textContent = 'Surprise me again';
    btn.addEventListener('click', showPick);
    pickBox.append(text, btn);

    pickBox.classList.remove('pick-swap'); void pickBox.offsetWidth; pickBox.classList.add('pick-swap');
    cards.forEach(c => c.classList.remove('picked'));
    card.classList.add('picked');
  }
  showPick();
});
