function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 }, // Centered at the equator and prime meridian
      zoom: 2, // Zoom level to show the entire world
      mapTypeId: 'terrain' // Optional: Set the map type to terrain view
    });
  }
  