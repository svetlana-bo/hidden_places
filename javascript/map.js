document.addEventListener('DOMContentLoaded', function () {
    // Get map container element
    const mapElement = document.getElementById('map');

    // Extract coordinates and zoom level from data attributes
    const latitude = parseFloat(mapElement.getAttribute('data-lat'));
    const longitude = parseFloat(mapElement.getAttribute('data-lng'));
    const zoomLevel = parseInt(mapElement.getAttribute('data-zoom'), 10);

    // Initialize the map
    const map = L.map('map').setView([latitude, longitude], zoomLevel);

    // Set up the OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker to the map
    L.marker([latitude, longitude]).addTo(map)
        .openPopup();
});
