// Fallback markets list (ensures seamless operation on file:/// or offline)
const fallbackMarketsList = [
  {
    id: 1,
    name: "Green Basket Market",
    area: "Clifton",
    address: "Block 4, Marine Promenade, Clifton, Karachi",
    days: ["Monday", "Wednesday", "Friday", "Saturday"],
    time: "09:00 - 18:00",
    description: "Fresh fruits, vegetables and organic produce.",
    about: "Green Basket Market in Clifton is a premier local food destination offering farm-fresh harvests four days a week. With certified organic growers, farm-picked greens, crisp seasonal fruits, and local dairy, it provides healthy, chemical-free produce straight from growers to your family.",
    products: ["Mangoes", "Tomatoes", "Spinach", "Lettuce", "Organic Honey", "Farm Eggs"],
    lat: 24.8138,
    lng: 67.0305,
    image: "images/market-1.jpg",
    phone: "+92 300 1122334",
    email: "clifton@greenbasket.example",
    vendors: 18,
    rating: 4.9,
    features: ["Certified Organic Produce", "Fresh Morning Harvest", "Free Dedicated Parking", "Digital & Card Payments", "Wheelchair Accessible"]
  },
  {
    id: 2,
    name: "Fresh Farm Shop",
    area: "DHA",
    address: "Phase 6, Khayaban-e-Shahbaz, DHA, Karachi",
    days: ["Tuesday", "Thursday", "Saturday"],
    time: "08:00 - 17:00",
    description: "Local farm produce delivered fresh every morning.",
    about: "Fresh Farm Shop in DHA bridges residents with fresh agricultural produce delivered directly from regional farms every Tuesday, Thursday, and Saturday morning. Enjoy crisp orchard apples, fresh root vegetables, aromatic culinary herbs, and unpasteurized raw honey.",
    products: ["Apples", "Potatoes", "Carrots", "Herbs", "Fresh Milk", "Butter"],
    lat: 24.8015,
    lng: 67.0648,
    image: "images/market-2.jpg",
    phone: "+92 301 2233445",
    email: "dha@freshfarmshop.example",
    vendors: 14,
    rating: 4.8,
    features: ["Daily Morning Restock", "Pesticide-Free Vegetables", "Curbside Quick Pickup", "Bulk Purchase Discounts"]
  },
  {
    id: 3,
    name: "Karachi Fresh Market",
    area: "Gulshan",
    address: "Block 6, University Road, Gulshan-e-Iqbal, Karachi",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    time: "10:00 - 20:00",
    description: "A neighborhood market with seasonal fruits and vegetables.",
    about: "Karachi Fresh Market is one of Gulshan's most active community hubs. Open six days a week with convenient evening hours, this market features prime Sindh mangoes, seasonal bananas, hill-grown stone fruits, and crisp salad vegetables at wholesale community prices.",
    products: ["Mangoes", "Bananas", "Onions", "Cucumbers", "Garlic", "Citrus"],
    lat: 24.9205,
    lng: 67.0831,
    image: "images/market-3.jpg",
    phone: "+92 302 3344556",
    email: "gulshan@karachifresh.example",
    vendors: 28,
    rating: 4.7,
    features: ["Extended Evening Hours", "Wholesale & Retail Rates", "Wide Seasonal Variety", "Direct Farm Stalls"]
  },
  {
    id: 4,
    name: "Organic Corner",
    area: "PECHS",
    address: "Block 2, Near Tariq Road, PECHS, Karachi",
    days: ["Friday", "Saturday", "Sunday"],
    time: "09:00 - 19:00",
    description: "Organic vegetables and locally grown seasonal produce.",
    about: "Organic Corner in PECHS caters to health-conscious families looking for clean, chemical-free food. Operating on weekends, local farmers bring freshly harvested spinach, broccoli, hydroponic lettuce, and fragrant herbs, alongside stone-ground flour and artisanal cheeses.",
    products: ["Spinach", "Broccoli", "Lettuce", "Herbs", "Wild Honey", "Brown Rice"],
    lat: 24.8667,
    lng: 67.0731,
    image: "images/market-4.jpg",
    phone: "+92 303 4455667",
    email: "pechs@organiccorner.example",
    vendors: 12,
    rating: 4.9,
    features: ["100% Pesticide Free", "Hydroponic & Soil Crops", "Eco-Friendly Packaging", "Weekend Farmer Meetups"]
  },
  {
    id: 5,
    name: "Farmers Fresh Hub",
    area: "North Nazimabad",
    address: "Block H, Hyderi Market Area, North Nazimabad, Karachi",
    days: ["Wednesday", "Saturday", "Sunday"],
    time: "08:00 - 16:00",
    description: "Fresh produce directly from local growers.",
    about: "Farmers Fresh Hub gathers growers from Gadap and rural Sindh to offer farm-gate freshness at transparent prices. Known for plump field tomatoes, sweet mangoes, clean root vegetables, and fresh okra, it is a bustling weekend family market.",
    products: ["Tomatoes", "Mangoes", "Potatoes", "Peppers", "Cauliflower", "Guava"],
    lat: 24.9272,
    lng: 67.0561,
    image: "images/market-5.jpg",
    phone: "+92 304 5566778",
    email: "nazimabad@farmershub.example",
    vendors: 22,
    rating: 4.8,
    features: ["Grower-to-Consumer Direct", "Guaranteed Fresh Picking", "Community Subsidized Pricing", "Family Friendly Atmosphere"]
  },
  {
    id: 6,
    name: "Green Roots Market",
    area: "Malir",
    address: "Main Malir River Road, Model Colony, Malir, Karachi",
    days: ["Thursday", "Sunday"],
    time: "08:00 - 16:00",
    description: "Fresh local vegetables, herbs and seasonal fruit for families.",
    about: "Situated right beside Karachi's agricultural green belt, Green Roots Market in Malir offers vegetables harvested mere hours before display. Famous for leafy greens, fresh coriander, mint, local radishes, and seasonal tree fruit.",
    products: ["Potato", "Spinach", "Banana", "Coriander", "Radish", "Turnip"],
    lat: 24.894,
    lng: 67.19,
    image: "images/market-6.jpg",
    phone: "+92 305 6677889",
    email: "malir@greenroots.example",
    vendors: 16,
    rating: 4.7,
    features: ["Direct from Malir Green Belt", "Same-Day Harvest Guarantee", "Abundant Culinary Herbs", "Wholesale Basket Discounts"]
  },
  {
    id: 7,
    name: "Bahadurabad Fresh Bazaar",
    area: "Bahadurabad",
    address: "Main Bahadurabad Chowrangi, Block 5, Gulshan-e-Iqbal, Karachi",
    days: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    time: "07:30 - 17:00",
    description: "Central Karachi bazaar with vendors offering vegetables, tropical fruits, spices, lentils and dry fruits.",
    about: "This sample community-market listing serves Bahadurabad and nearby areas with fresh produce, dry goods and spices.",
    products: ["Tomatoes", "Onions", "Potatoes", "Lentils", "Dates", "Dry Fruits", "Mangoes", "Bananas", "Ginger", "Turmeric"],
    lat: 24.9063,
    lng: 67.0742,
    image: "images/market-1.jpg",
    phone: "+92 306 7788990",
    email: "bahadurabad@freshbazaar.example",
    vendors: 32,
    rating: 4.6,
    features: ["Widest Produce Variety", "Dry Fruits & Spices Section", "Open 5 Days a Week", "Central Karachi Location", "Bulk Wholesale Available", "Early Morning 7:30 Opening", "Cash & Digital Payments"]
  },
  {
    id: 8,
    name: "Saddar Heritage Market",
    area: "Saddar",
    address: "Elphinstone Street, Near Empress Market, Saddar, Karachi",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    time: "08:00 - 21:00",
    description: "A historic neighborhood market with traditional vendors, spices, tropical fruits and local specialties.",
    about: "This sample listing represents the traditional market experience around Saddar, with produce, spices and pantry specialties.",
    products: ["Spices", "Dried Herbs", "Sugarcane", "Coconut", "Papaya", "Guava", "Dates", "Pickles", "Tamarind", "Jaggery"],
    lat: 24.8607,
    lng: 67.0099,
    image: "images/market-2.jpg",
    phone: "+92 307 8899001",
    email: "saddar@heritagemkt.example",
    vendors: 45,
    rating: 4.5,
    features: ["Open 7 Days a Week", "Late Evening Till 9PM", "Historic Location", "Exotic Spices & Herbs", "Traditional Street Foods", "Largest Vendor Count", "Tourist Friendly"]
  },
  {
    id: 9,
    name: "Johar Agri Market",
    area: "Scheme 33",
    address: "Main Super Highway Service Road, Scheme 33, Karachi",
    days: ["Saturday", "Sunday"],
    time: "06:00 - 14:00",
    description: "An early morning weekend market with vegetables and fruits from nearby farms.",
    about: "This sample listing represents a weekend farm-style market near the Scheme 33 agricultural corridor.",
    products: ["Tomatoes", "Capsicum", "Watermelon", "Pumpkin", "Peas", "Fresh Corn", "Chillies", "Bitter Gourd", "Bottle Gourd", "Spring Onion"],
    lat: 24.9742,
    lng: 67.1248,
    image: "images/market-3.jpg",
    phone: "+92 308 9900112",
    email: "scheme33@joharagri.example",
    vendors: 20,
    rating: 4.6,
    features: ["Earliest Opening at 6AM", "Best Farm-Gate Prices", "Direct Highway Access", "Weekend Only Market", "Wholesale by Crate", "Live Plant Seedlings", "Quick Load & Go Service"]
  },
  {
    id: 10,
    name: "Korangi Harvest Hub",
    area: "Korangi",
    address: "Sector 24, Korangi Industrial Area Road, Korangi, Karachi",
    days: ["Tuesday", "Wednesday", "Friday", "Saturday"],
    time: "09:00 - 18:00",
    description: "A community market with fresh produce, dairy, eggs, lentils and everyday grocery staples.",
    about: "This sample listing represents an affordable neighborhood food market serving Korangi and nearby communities.",
    products: ["Potatoes", "Onions", "Eggs", "Lentils", "Bananas", "Tomatoes", "Okra", "Cabbage", "Fresh Milk", "Coconut Oil"],
    lat: 24.8312,
    lng: 67.1251,
    image: "images/market-4.jpg",
    phone: "+92 309 0011223",
    email: "korangi@harvesthub.example",
    vendors: 24,
    rating: 4.5,
    features: ["Community Affordable Pricing", "Factory Worker Discounts", "Bulk Family Packs", "Dairy & Eggs Section", "Pantry Staples Available", "Wheelchair Accessible", "Children Welcome"]
  },
  {
    id: 11,
    name: "Landhi Community Produce Market",
    area: "Landhi",
    address: "Sector 36-B, Landhi, Karachi",
    days: ["Tuesday", "Thursday", "Saturday", "Sunday"],
    time: "08:00 - 17:00",
    description: "A neighborhood produce market with seasonal vegetables, fruit, herbs and everyday pantry staples.",
    about: "This sample listing represents a neighborhood market serving Landhi residents with seasonal produce and household staples.",
    products: ["Bananas", "Guava", "Tomatoes", "Okra", "Coriander", "Eggs", "Lentils", "Lemons"],
    lat: 24.8437,
    lng: 67.1974,
    image: "images/market-5.jpg",
    phone: "+92 300 0000011",
    email: "landhi@freshfind.example",
    vendors: 17,
    rating: 4.5,
    features: ["Seasonal Produce", "Independent Local Vendors", "Everyday Pantry Staples", "Weekend Shopping", "Cash and Digital Payments"]
  },
  {
    id: 12,
    name: "Johar Seasonal Bazaar",
    area: "Gulistan-e-Johar",
    address: "Block 15, Gulistan-e-Johar, Karachi",
    days: ["Wednesday", "Friday", "Saturday", "Sunday"],
    time: "09:00 - 18:00",
    description: "A family-friendly neighborhood bazaar featuring seasonal fruit, vegetables, fresh herbs and locally made pantry goods.",
    about: "This sample listing adds a neighborhood option in Gulistan-e-Johar, with rotating seasonal produce, fresh herbs and pantry goods.",
    products: ["Pomegranate", "Cucumbers", "Spinach", "Mint", "Dates", "Cauliflower", "Potatoes", "Honey"],
    lat: 24.9296,
    lng: 67.1332,
    image: "images/market-3.jpg",
    phone: "+92 300 0000012",
    email: "johar@freshfind.example",
    vendors: 19,
    rating: 4.6,
    features: ["Rotating Seasonal Selection", "Fresh Herb Stalls", "Local Pantry Goods", "Family Friendly", "Reusable Bags Welcome"]
  },
  {
    id: 13,
    name: "Shah Faisal Growers Market",
    area: "Shah Faisal Colony",
    address: "Main Shah Faisal Road, Shah Faisal Colony, Karachi",
    days: ["Monday", "Wednesday", "Friday", "Saturday"],
    time: "07:30 - 16:30",
    description: "A growers-focused sample market with fresh greens, seasonal vegetables, fruit and family-size produce bundles.",
    about: "This sample listing represents a growers-focused market in Shah Faisal Colony, with leafy greens, seasonal vegetables, local fruit and family produce bundles.",
    products: ["Peas", "Carrots", "Eggplant", "Bananas", "Coriander", "Pumpkin", "Tomatoes", "Oranges"],
    lat: 24.8748,
    lng: 67.1651,
    image: "images/market-6.jpg",
    phone: "+92 300 0000013",
    email: "shahfaisal@freshfind.example",
    vendors: 15,
    rating: 4.4,
    features: ["Seasonal Greens", "Family-Size Produce Bundles", "Local Growers", "Early Opening", "Weekly Variety"]
  },
  {
    id: 14,
    name: "Keamari Coastside Market",
    area: "Keamari",
    address: "Railway Colony Road, Keamari, Karachi",
    days: ["Thursday", "Friday", "Saturday", "Sunday"],
    time: "08:30 - 17:30",
    description: "A sample coastal neighborhood market with seasonal fruit, vegetables, herbs and locally stocked pantry items.",
    about: "This sample listing broadens the directory to Keamari with seasonal produce, cooking herbs and everyday pantry goods.",
    products: ["Coconuts", "Lemons", "Guava", "Onions", "Cucumbers", "Mint", "Dates", "Sweet Potatoes"],
    lat: 24.8068,
    lng: 66.9752,
    image: "images/market-2.jpg",
    phone: "+92 300 0000014",
    email: "keamari@freshfind.example",
    vendors: 13,
    rating: 4.3,
    features: ["Seasonal Fruit and Vegetables", "Cooking Herbs", "Neighborhood Vendors", "Weekend Hours", "Reusable Bags Welcome"]
  }
];

let markets = fallbackMarketsList;
let produce = [];
let favorites = JSON.parse(localStorage.getItem('freshfindFavorites') || '[]');

const $ = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', async () => {
  // Update footer copyright year
  if ($('year')) {
    $('year').textContent = new Date().getFullYear();
  }

  // Update visitor count
  let visitor = Number(localStorage.getItem('freshfindVisitors') || 1247) + 1;
  localStorage.setItem('freshfindVisitors', visitor);
  if ($('visitorCount')) {
    $('visitorCount').textContent = visitor.toLocaleString();
  }

  // Mobile menu toggle
  const navToggle = $('navToggle');
  const mainNav = $('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('mobile-open');
      navToggle.textContent = isOpen ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Dropdown click & keyboard support
  const dropdown = $('homeDropdown');
  const dropdownBtn = $('homeDropdownBtn');
  if (dropdown && dropdownBtn) {
    dropdownBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 || e.target.classList.contains('dropdown-caret')) {
        e.preventDefault();
        dropdown.classList.toggle('open');
        const isOpen = dropdown.classList.contains('open');
        dropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      }
      if (mainNav && mainNav.classList.contains('mobile-open')) {
        if (!mainNav.contains(e.target) && e.target !== navToggle) {
          mainNav.classList.remove('mobile-open');
          if (navToggle) {
            navToggle.textContent = '☰';
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  }

  // Close mobile nav when clicking any nav link
  document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900 && !link.classList.contains('dropdown-toggle')) {
        if (mainNav) mainNav.classList.remove('mobile-open');
        if (navToggle) {
          navToggle.textContent = '☰';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Load data for markets and produce
  try {
    const [marketsData, produceData] = await Promise.all([
      fetch('data/markets.json').then(r => r.json()).catch(() => fallbackMarketsList),
      fetch('data/produce.json').then(r => r.json()).catch(() => [])
    ]);
    if (Array.isArray(marketsData) && marketsData.length > 0) {
      markets = marketsData;
    }
    produce = produceData;
  } catch (error) {
    console.log('Using fallback market dataset');
    markets = fallbackMarketsList;
  }

  window.markets = markets;
  window.produce = produce;

  if ($('marketCount')) $('marketCount').textContent = markets.length;
  if ($('produceCount')) $('produceCount').textContent = produce.length;

  // Populate area filter
  if ($('areaFilter') && markets.length) {
    const areas = [...new Set(markets.map(m => m.area))].sort();
    areas.forEach(area => {
      $('areaFilter').insertAdjacentHTML('beforeend', `<option value="${area}">${area}</option>`);
    });
  }

  // Populate produce category filter
  if ($('categoryFilter') && produce.length) {
    const categories = [...new Set(produce.map(p => p.category))].sort();
    categories.forEach(cat => {
      $('categoryFilter').insertAdjacentHTML('beforeend', `<option value="${cat}">${cat}</option>`);
    });
  }

  // Render initial markets and produce if containers exist
  if ($('marketGrid') && markets.length) {
    const initialMarkets = document.body.dataset.page === 'favorites'
      ? markets.filter(market => favorites.includes(market.id))
      : markets;
    renderMarkets(initialMarkets);
  }
  if ($('produceGrid') && produce.length) {
    renderProduce(produce);
  }

  // Draw markers on map if Leaflet and drawMarkers exist
  if (window.drawMarkers && markets.length) {
    window.drawMarkers(markets);
  }

  // Local real-time clock
  if ($('clock')) {
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Filter event listeners
  ['searchInput', 'areaFilter', 'dayFilter', 'sortFilter'].forEach(id => {
    if ($(id)) $(id).addEventListener('input', filterMarkets);
  });

  // Hero search
  if ($('heroSearchBtn') && $('heroSearch')) {
    $('heroSearchBtn').addEventListener('click', () => {
      if ($('searchInput')) {
        $('searchInput').value = $('heroSearch').value;
        filterMarkets();
        location.hash = 'markets';
      } else {
        window.location.href = `markets.html?search=${encodeURIComponent($('heroSearch').value)}`;
      }
    });
    $('heroSearch').addEventListener('keydown', e => {
      if (e.key === 'Enter') $('heroSearchBtn').click();
    });
  }

  // Clear filters
  if ($('clearFilters')) {
    $('clearFilters').addEventListener('click', () => {
      if ($('searchInput')) $('searchInput').value = '';
      if ($('areaFilter')) $('areaFilter').value = '';
      if ($('dayFilter')) $('dayFilter').value = '';
      if ($('sortFilter')) $('sortFilter').value = 'name';
      filterMarkets();
    });
  }

  // Category filter for produce
  if ($('categoryFilter')) {
    $('categoryFilter').addEventListener('change', filterProduce);
  }

  // Near me geolocation
  if ($('locateBtn')) {
    $('locateBtn').addEventListener('click', findNearMe);
  }

  // Modal close handlers
  if ($('modalClose')) {
    $('modalClose').addEventListener('click', closeModal);
  }
  if ($('marketModal')) {
    $('marketModal').addEventListener('click', e => {
      if (e.target.id === 'marketModal') closeModal();
    });
  }

  // Contact form handler (if on contact page)
  if ($('contactForm')) {
    $('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = $('formFeedback');
      if (feedback) {
        feedback.innerHTML = '✅ Thank you! Your message has been sent successfully. We will get back to you shortly.';
        feedback.classList.remove('hidden');
        $('contactForm').reset();
      }
    });
  }

  // Check URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam && $('searchInput')) {
    $('searchInput').value = searchParam;
    filterMarkets();
  }
});

function updateClock() {
  if ($('clock')) {
    $('clock').textContent = new Date().toLocaleTimeString();
  }
}

function isOpen(market) {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  if (!market.days || !market.days.includes(day)) return false;
  if (!market.time) return false;
  const [open, close] = market.time.split(' - ').map(t => t.split(':').map(Number));
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= open[0] * 60 + open[1] && current <= close[0] * 60 + close[1];
}

function filterMarkets() {
  if (!$('marketGrid')) return;
  const q = $('searchInput') ? $('searchInput').value.toLowerCase().trim() : '';
  const area = $('areaFilter') ? $('areaFilter').value : '';
  const day = $('dayFilter') ? $('dayFilter').value : '';
  const sort = $('sortFilter') ? $('sortFilter').value : 'name';

  const sourceMarkets = document.body.dataset.page === 'favorites'
    ? markets.filter(market => favorites.includes(market.id))
    : markets;
  let result = sourceMarkets.filter(m =>
    (!q || [m.name, m.area, m.description, ...m.products].join(' ').toLowerCase().includes(q)) &&
    (!area || m.area === area) &&
    (!day || m.days.includes(day))
  );

  if (sort === 'open') {
    result.sort((a, b) => Number(isOpen(b)) - Number(isOpen(a)));
  } else {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderMarkets(result);
}

function renderMarkets(list) {
  if (!$('marketGrid')) return;
  if ($('emptyState')) {
    $('emptyState').classList.toggle('hidden', list.length !== 0);
  }

  if ($('openCount')) {
    const openCount = list.filter(isOpen).length;
    $('openCount').textContent = openCount;
  }

  // Show result count if on markets page
  const countEl = document.querySelector('.result-count');
  if (countEl) {
    countEl.textContent = `Showing ${list.length} market${list.length !== 1 ? 's' : ''}`;
  }

  $('marketGrid').innerHTML = list.map(m => {
    const open = isOpen(m);
    const isFav = favorites.includes(m.id);
    const stars = renderStarsLocal(m.rating || 4.8);
    return `
    <article class="market-card" style="position:relative;">
      <div class="market-icon">
        <img src="${m.image || `images/market-${m.id}.jpg`}" alt="${m.name}" loading="lazy">
        <button class="fav-btn${isFav ? ' saved' : ''}" onclick="toggleFavoriteCard(${m.id}, this)" aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">${isFav ? '❤️' : '🤍'}</button>
      </div>
      <div class="open-badge ${open ? 'open-now' : 'closed-now'}">${open ? '● OPEN NOW' : '○ CLOSED'}</div>
      <h3>${m.name}</h3>
      <div class="market-meta">📍 ${m.area} • 🕒 ${m.time}</div>
      <div class="market-rating">
        <span class="stars">${stars}</span>
        <span class="rating-value">${m.rating || 4.8}</span>
      </div>
      <div class="market-info-row">
        <span>👩‍🌾 ${m.vendors || 15} vendors</span>
        <span>•</span>
        <span>📅 ${(m.days || []).length} days/week</span>
      </div>
      <p>${m.description}</p>
      <div class="product-tags">
        ${(m.products || []).slice(0, 5).map(p => `<span class="tag">${p}</span>`).join('')}
      </div>
      <div class="card-actions">
        <a href="market-detail.html?id=${m.id}" class="btn primary" style="width:100%; text-align:center;">View Details</a>
      </div>
    </article>
  `}).join('');

  // Trigger scroll reveal for newly rendered cards
  if (typeof initScrollReveal === 'function') {
    setTimeout(initScrollReveal, 50);
  }
}

function renderStarsLocal(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function toggleFavoriteCard(id, btn) {
  favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
  localStorage.setItem('freshfindFavorites', JSON.stringify(favorites));
  const isFav = favorites.includes(id);
  btn.textContent = isFav ? '❤️' : '🤍';
  btn.classList.toggle('saved', isFav);
  if (typeof showToast === 'function') {
    showToast(isFav ? '❤️ Added to favorites!' : '💔 Removed from favorites', isFav ? 'success' : 'info');
  }
  if (document.body.dataset.page === 'favorites') {
    filterMarkets();
  }
}


function renderProduce(list) {
  if (!$('produceGrid')) return;
  $('produceGrid').innerHTML = list.map(p => `
    <article class="produce-card">
      <div class="produce-img-wrap">
        <img src="${p.image || `images/produce-${p.name.toLowerCase()}.jpg`}" alt="${p.name}" loading="lazy">
      </div>
      <h3>${p.name}</h3>
      <span class="season">🗓 ${p.season}</span>
      <p>${p.description}</p>
      <small style="display:inline-block;margin-top:6px;padding:3px 8px;background:#edf7ee;border-radius:6px;font-weight:600;color:#2e7d32;">
        ${p.category}
      </small>
    </article>
  `).join('');

  // Mark in-season produce
  if (typeof markSeasonalCards === 'function') {
    setTimeout(markSeasonalCards, 100);
  }
}


function filterProduce() {
  if (!$('produceGrid') || !$('categoryFilter')) return;
  const cat = $('categoryFilter').value;
  renderProduce(cat ? produce.filter(p => p.category === cat) : produce);
}

function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
  localStorage.setItem('freshfindFavorites', JSON.stringify(favorites));
  if ($('marketGrid')) {
    filterMarkets();
  }
}

function showMarket(id) {
  window.location.href = `market-detail.html?id=${id}`;
}

function closeModal() {
  if ($('marketModal')) {
    $('marketModal').classList.add('hidden');
  }
}

function findNearMe() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    if (window.setUserLocation) {
      window.setUserLocation(pos.coords.latitude, pos.coords.longitude);
    }
  }, () => {
    alert('Location permission was not granted. You can still browse and use the market map.');
  });
}
