# FreshFind — Fresh All Along (v2.0 Advanced)

FreshFind is a fully upgraded advanced frontend farmers market discovery website for Karachi, Pakistan.

## ✨ New Advanced Features (v2.0)

### 🌙 Dark Mode
- Full dark theme with one-click toggle (🌙/☀️ button in navbar)
- Preference saved in `localStorage` — persists across visits
- All components fully themed: cards, map, chatbot, forms, modals

### 🎬 Scroll-Reveal Animations
- Market cards, produce cards, feature cards animate in when scrolled into view
- Powered by `IntersectionObserver` (no heavy library needed)
- Staggered timing for natural, cascade effect

### 🌿 Seasonal Produce Indicator
- Automatically detects the current month
- Highlights produce that is **in season right now** with a pulsing green badge
- Works with "Year-round", single-month and range-based season strings

### 🌟 Star Ratings + Vendor Count on Market Cards
- Cards now display ★ star ratings, vendor count, and days-per-week
- Replaces plain eyebrow text with real, data-driven metrics

### ❤️ Heart Favorite Buttons
- Heart button overlaid on each market card image
- Red filled heart when saved, hollow when not
- Toast notification confirms action (no more silent alerts)

### 🔔 Toast Notifications
- Non-blocking, animated bottom-center toast messages
- Types: success ✅, info ℹ️, warning ⚠️, error ❌
- Auto-dismiss after 3 seconds

### ↑ Back-to-Top Button
- Smooth-scroll back-to-top button appears after scrolling 400px
- Fully styled in dark and light modes

### 🔍 Produce Live Search
- Real-time search bar on the Produce Guide section
- Filters cards by name, season, and category as you type

### 📧 Newsletter Signup Section
- Beautiful newsletter CTA section before footer on Home & Markets pages
- Toast confirmation on subscribe (frontend-only, no server needed)

### 📱 PWA-Ready (Progressive Web App)
- `manifest.json` with app metadata, theme color, and icons
- `theme-color` meta tag for Android Chrome browser bar
- Open Graph meta tags for social sharing previews
- Can be installed as a home screen app on mobile

### 🤖 Advanced Chatbot (25+ responses)
- Typing indicator animation before each reply
- 25+ keyword patterns: all markets by area, all produce by name, dark mode, favorites, newsletter, seasonal info, map, schedule, vendors, contact
- Smooth open/close animation
- Escape key closes chatbot
- Auto-focuses input when opened

### ✨ Hero Gradient Animation
- Subtle animated background gradient on the hero section
- 14-second cycle, smooth and non-distracting

### 📊 Animated Stats Counters
- Stats bar numbers count up from 0 when scrolled into view
- Smooth cubic easing animation

### 🖨️ Print & Share (Market Detail)
- **Share button**: Uses Web Share API on mobile, falls back to clipboard copy
- **Print button**: Prints market detail cleanly (hides nav, chatbot, footer)

### 🎨 Result Count Display
- Markets page shows "Showing X markets" count that updates live with filters

### 🏗️ Skeleton Loading Styles
- CSS skeleton shimmer animation classes ready for future async loading

---

## Original Features (v1.0)
- Responsive green-themed interface with dropdown navigation
- Multi-page site: Home, Markets, About, Contact, Market Detail pages
- Market directory with search, area, day, and sort filters
- Dedicated Favorites page for markets saved with the heart button
- Sample market data in JSON (14 markets, 16 produce items)
- Interactive Leaflet + OpenStreetMap map with geolocation
- Market detail pages with schedule table, amenities, mini-map
- Seasonal produce guide with category filter
- Favorites using browser `localStorage`
- Simulated visitor counter
- Real-time browser clock

---

## Technology Stack
- **HTML5** — Semantic markup with ARIA attributes
- **CSS3** — Custom properties, Grid, Flexbox, CSS animations, `@media` queries
- **Vanilla JavaScript (ES2020+)** — No frameworks, minimal footprint
- **JSON** — Local data for markets and produce
- **Leaflet.js + OpenStreetMap** — Interactive map
- **Web APIs** — Geolocation, Web Share, Clipboard, IntersectionObserver, localStorage

---

## Folder Structure
```
FreshFind/
├── index.html          # Home page (hero, markets, map, produce, newsletter)
├── markets.html        # Full market directory with map
├── favorites.html      # Saved market list
├── market-detail.html  # Dynamic single market detail page
├── market-1.html       # Static detail for Green Basket Market
├── market-2.html       # Static detail for Fresh Farm Shop
├── market-3.html       # Static detail for Karachi Fresh Market
├── market-4.html       # Static detail for Organic Corner
├── market-5.html       # Static detail for Farmers Fresh Hub
├── market-6.html       # Static detail for Green Roots Market
├── about.html          # About Us page
├── contact.html        # Contact page with message form
├── manifest.json       # PWA web app manifest
├── README.md
├── css/
│   └── style.css       # Full stylesheet (light + dark modes, all components)
├── js/
│   ├── utils.js        # Advanced utilities (dark mode, toast, reveal, seasonal, etc.)
│   ├── app.js          # Market/produce data, rendering, filters
│   ├── map.js          # Leaflet map initialization and geolocation
│   ├── chatbot.js      # Advanced rule-based chatbot assistant
│   └── market-detail.js # Dynamic market detail page logic
├── data/
│   ├── markets.json    # 14 sample market records
│   └── produce.json    # 16 seasonal produce items
└── images/
    └── (all market and produce images)
```

---

## How to Run

Because JSON data is loaded via `fetch()`, use a local web server.

### VS Code
Install **Live Server** extension → right-click `index.html` → **Open with Live Server**

### Python
```bash
python -m http.server 5500
```
Then open: `http://localhost:5500`

---

## Notes
- All market listings and ratings are sample/demonstration data for Karachi, not verified business information.
- The chatbot is rule-based and offline — no external AI API calls.
- Dark mode, favorites, and visitor count all use `localStorage`.
- Map tiles are provided by OpenStreetMap via Leaflet CDN.
- No backend or database required — 100% static frontend.
