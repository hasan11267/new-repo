let map;
let markers = {};
let userMarker;

document.addEventListener('DOMContentLoaded', () => {
  map = L.map('map').setView([24.8607, 67.0011], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
});

window.drawMarkers = function(list) {
  if (!map) return;
  Object.values(markers).forEach(marker => map.removeLayer(marker));
  markers = {};
  list.forEach(m => {
    const marker = L.marker([m.lat,m.lng]).addTo(map);
    marker.bindPopup(`<strong>${m.name}</strong><br>${m.area}<br>${m.time}<br><button onclick="showMarket(${m.id})">Details</button>`);
    markers[m.id] = marker;
  });
};

window.focusMarket = function(id) {
  const m = window.markets?.find(x => x.id === id);
  if (!m || !map) return;
  map.setView([m.lat,m.lng], 15);
  markers[id]?.openPopup();
  document.getElementById('map-section').scrollIntoView({behavior:'smooth'});
};

window.setUserLocation = function(lat,lng) {
  if (userMarker) map.removeLayer(userMarker);
  userMarker = L.marker([lat,lng]).addTo(map).bindPopup('📍 Your location').openPopup();
  map.setView([lat,lng], 13);
  if (window.markets) {
    window.markets.forEach(m => m.distance = haversine(lat,lng,m.lat,m.lng));
    window.markets.sort((a,b) => a.distance-b.distance);
    renderMarkets(window.markets);
    drawMarkers(window.markets);
  }
};

function haversine(lat1,lon1,lat2,lon2) {
  const R = 6371;
  const dLat = (lat2-lat1) * Math.PI/180;
  const dLon = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

