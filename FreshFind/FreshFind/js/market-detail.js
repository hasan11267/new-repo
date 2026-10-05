// Fallback market dataset (ensures instant operation under file:/// or offline)
const fallbackMarkets = [
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
    features: [
      "Certified Organic Produce",
      "Fresh Morning Harvest",
      "Free Dedicated Parking",
      "Digital & Card Payments",
      "Wheelchair Accessible"
    ]
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
    features: [
      "Daily Morning Restock",
      "Pesticide-Free Vegetables",
      "Curbside Quick Pickup",
      "Bulk Purchase Discounts"
    ]
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
    features: [
      "Extended Evening Hours",
      "Wholesale & Retail Rates",
      "Wide Seasonal Variety",
      "Direct Farm Stalls"
    ]
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
    features: [
      "100% Pesticide Free",
      "Hydroponic & Soil Crops",
      "Eco-Friendly Packaging",
      "Weekend Farmer Meetups"
    ]
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
    features: [
      "Grower-to-Consumer Direct",
      "Guaranteed Fresh Picking",
      "Community Subsidized Pricing",
      "Family Friendly Atmosphere"
    ]
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
    features: [
      "Direct from Malir Green Belt",
      "Same-Day Harvest Guarantee",
      "Abundant Culinary Herbs",
      "Wholesale Basket Discounts"
    ]
  }
];

let allMarkets = fallbackMarkets;
let currentMarket = null;
let detailMap = null;

const $ = id => document.getElementById(id);

document.addEventListener('DOMContentLoaded', async () => {
  // Footer year
  if ($('year')) $('year').textContent = new Date().getFullYear();

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

  // Close mobile nav on item click
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

  // Try to load fresh data from JSON
  try {
    const fetched = await fetch('data/markets.json').then(r => r.json());
    if (Array.isArray(fetched) && fetched.length > 0) {
      allMarkets = fetched;
    }
  } catch (err) {
    console.log('Using embedded fallback market data');
  }

  window.markets = allMarkets;

  // Determine market ID from query param (?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = Number(urlParams.get('id')) || 1;
  currentMarket = allMarkets.find(m => m.id === requestedId) || allMarkets[0];

  renderMarketDetails(currentMarket);
  renderRelatedMarkets(allMarkets, currentMarket.id);
  initDetailMap(currentMarket);
  setupFavoriteButton(currentMarket.id);
});

function isMarketCurrentlyOpen(market) {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  if (!market.days || !market.days.includes(day)) return false;
  if (!market.time) return false;
  const [open, close] = market.time.split(' - ').map(t => t.split(':').map(Number));
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return currentMinutes >= open[0] * 60 + open[1] && currentMinutes <= close[0] * 60 + close[1];
}

function renderMarketDetails(m) {
  // Page Title & Breadcrumbs
  document.title = `${m.name} | FreshFind`;
  if ($('breadMarketName')) $('breadMarketName').textContent = m.name;

  // Header Card
  if ($('detailIcon')) {
    const imgSrc = m.image || `images/market-${m.id}.jpg`;
    $('detailIcon').innerHTML = `<img src="${imgSrc}" alt="${m.name}">`;
  }
  if ($('detailName')) $('detailName').textContent = m.name;
  if ($('detailArea')) $('detailArea').textContent = m.area;
  if ($('detailHours')) $('detailHours').textContent = m.time;
  if ($('detailDays')) $('detailDays').textContent = (m.days || []).join(', ');

  // Status Pill
  const open = isMarketCurrentlyOpen(m);
  if ($('detailStatusPill')) {
    $('detailStatusPill').className = `badge-pill ${open ? 'open' : 'closed'}`;
    $('detailStatusPill').textContent = open ? '● OPEN NOW' : '○ CLOSED NOW';
  }

  // Rating & Vendors
  if ($('detailRatingPill')) {
    $('detailRatingPill').textContent = `⭐ ${m.rating || 4.8} Community Rating`;
  }
  if ($('detailVendorsPill')) {
    $('detailVendorsPill').textContent = `👩‍🌾 ${m.vendors || 15}+ Local Stalls`;
  }

  // About Text
  if ($('detailAbout')) {
    $('detailAbout').textContent = m.about || m.description;
  }

  // Produce Products
  if ($('detailProducts')) {
    $('detailProducts').innerHTML = (m.products || []).map(p => `
      <span class="tag" style="font-size:0.86rem; padding:8px 14px; background:#e8f5e9; color:#1b5e20; font-weight:600; border-radius:10px;">
        🌿 ${p}
      </span>
    `).join('');
  }

  // Amenities
  if ($('detailAmenities')) {
    const amenities = m.features || [
      'Certified Fresh Produce',
      'Morning Harvest Guarantee',
      'Free Parking Available',
      'Cash & Digital Payments',
      'Wheelchair Accessible'
    ];
    $('detailAmenities').innerHTML = amenities.map(f => `
      <div class="amenity-item">
        <span style="color:#2e7d32; font-weight:bold; font-size:1.1rem;">✓</span>
        <span>${f}</span>
      </div>
    `).join('');
  }

  // Schedule Table
  if ($('scheduleTableBody')) {
    const daysOfWeek = [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    $('scheduleTableBody').innerHTML = daysOfWeek.map(day => {
      const isOpenDay = m.days && m.days.includes(day);
      const isToday = day === todayName;
      const hoursText = isOpenDay ? m.time : 'Closed';
      const statusChip = isOpenDay
        ? '<span class="status-chip open">Open</span>'
        : '<span class="status-chip closed">Closed</span>';

      return `
        <tr class="${isToday ? 'today-row' : ''}">
          <td><strong>${day}</strong></td>
          <td>${hoursText}</td>
          <td>${statusChip}</td>
        </tr>
      `;
    }).join('');
  }

  // Sidebar Quick Info
  if ($('infoAddress')) $('infoAddress').textContent = m.address || `${m.area}, Karachi`;
  if ($('infoTime')) $('infoTime').textContent = m.time;
  if ($('infoDays')) $('infoDays').textContent = (m.days || []).join(', ');
  if ($('infoPhone')) $('infoPhone').textContent = m.phone || '+92 300 0000000';
  if ($('infoEmail')) $('infoEmail').textContent = m.email || 'market@freshfind.example';
}

function initDetailMap(m) {
  if (!$('detailMap') || typeof L === 'undefined') return;

  const lat = m.lat || 24.8607;
  const lng = m.lng || 67.0011;

  detailMap = L.map('detailMap').setView([lat, lng], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(detailMap);

  const marker = L.marker([lat, lng]).addTo(detailMap);
  marker.bindPopup(`<strong>${m.name}</strong><br>${m.address || m.area}<br>🕒 ${m.time}`).openPopup();

  if ($('directionsBtn')) {
    $('directionsBtn').addEventListener('click', () => {
      detailMap.setView([lat, lng], 16);
      marker.openPopup();
    });
  }
}

function setupFavoriteButton(id) {
  const btn = $('saveFavBtn');
  if (!btn) return;

  let favorites = JSON.parse(localStorage.getItem('freshfindFavorites') || '[]');
  const updateBtnText = () => {
    btn.textContent = favorites.includes(id) ? '★ Saved in Favorites' : '☆ Save to Favorites';
    if (favorites.includes(id)) {
      btn.classList.add('primary');
      btn.classList.remove('btn-outline');
    } else {
      btn.classList.remove('primary');
    }
  };

  updateBtnText();

  btn.addEventListener('click', () => {
    favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
    localStorage.setItem('freshfindFavorites', JSON.stringify(favorites));
    updateBtnText();
  });
}

function renderRelatedMarkets(list, currentId) {
  const grid = $('relatedMarketsGrid');
  if (!grid) return;

  const related = list.filter(m => m.id !== currentId).slice(0, 3);
  grid.innerHTML = related.map(m => `
    <article class="market-card">
      <div class="market-icon">
        <img src="${m.image || 'images/market-' + m.id + '.jpg'}" alt="${m.name}" loading="lazy">
      </div>
      <div class="eyebrow">${isMarketCurrentlyOpen(m) ? '● OPEN NOW' : 'MARKET'}</div>
      <h3>${m.name}</h3>
      <div class="market-meta">📍 ${m.area} • 🕒 ${m.time}</div>
      <p>${m.description}</p>
      <div class="product-tags">
        ${(m.products || []).slice(0, 4).map(p => `<span class="tag">${p}</span>`).join('')}
      </div>
      <div class="card-actions">
        <a href="market-detail.html?id=${m.id}" class="btn primary" style="width:100%; text-align:center;">View Details</a>
      </div>
    </article>
  `).join('');
}
