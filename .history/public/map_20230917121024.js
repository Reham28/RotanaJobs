function initMap() {
    const map = L.map('map').setView([25, 45], 4); // Set initial view coordinates and zoom level
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
  
    fetch('http://localhost:3000/jobs')
      .then(response => response.json())
      .then(data => {
        data.forEach(job => {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(job.location)}`)
            .then(response => response.json())
            .then(geoData => {
              if (geoData.length > 0) {
                const location = geoData[0];
                const marker = L.marker([location.lat, location.lon]).addTo(map);
                marker.bindPopup(`<b>${job.title}</b><br>${job.location}`).openPopup();
              } else {
                console.error('Error geocoding location:', job.location);
              }
            })
            .catch(error => console.error('Error:', error));
        });
      })
      .catch(error => console.error('Error:', error));
  }
  