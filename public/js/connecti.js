document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.location-connecti')

    if(mapContainer) {
        showMap();
    }
});

function showMap() {
    const lat = document.querySelector('#lat').value,
          lng = document.querySelector('#lng').value,
          address = document.querySelector('#address').value;

    var map = L.map('map').setView([lat,lng], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat,lng]).addTo(map).bindPopup(address).openPopup();

}