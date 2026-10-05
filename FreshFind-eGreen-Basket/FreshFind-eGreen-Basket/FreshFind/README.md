# FreshFind — Fresh All Along

FreshFind is a frontend-only farmers market discovery website based on the supplied FreshFind / eGreen Basket SRS.

## Features
- Responsive green-themed SPA-style interface
- Market directory with search, area and day filters
- Sample market/shop data in JSON
- Interactive Leaflet + OpenStreetMap map
- Browser geolocation ("Find Markets Near Me")
- Market detail modal
- Seasonal produce guide
- Static rule-based chatbot
- Favorites using browser localStorage
- Simulated visitor counter
- Real-time browser clock
- Responsive mobile navigation
- Dummy login button

## Technology
- HTML5
- CSS3
- JavaScript
- JSON
- Leaflet.js
- OpenStreetMap

## Folder Structure
```text
FreshFind/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── map.js
│   └── chatbot.js
├── data/
│   ├── markets.json
│   └── produce.json
├── images/
└── assets/
```

## How to Run

Because JSON is loaded with `fetch()`, use a local web server instead of opening `index.html` directly.

### VS Code
Install the Live Server extension, then right-click `index.html` and choose **Open with Live Server**.

### Python
From the FreshFind folder:
```bash
python -m http.server 5500
```
Then open:
`http://localhost:5500`

## Notes
- The sample market locations are demonstration data.
- Map tiles are provided by OpenStreetMap.
- Leaflet is loaded from its public CDN.
- No backend or database is included, matching the static frontend architecture described in the SRS.
- The chatbot is rule-based and does not call an external AI service.
