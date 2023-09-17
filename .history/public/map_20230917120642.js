function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: 25, lng: 45 } // Adjust this to fit your desired default view
    });
  
    fetch('http://localhost:3000/jobs')
      .then(response => response.json())
      .then(data => {
        data.forEach(job => {
          // Use the Google Maps Geocoding API to get coordinates from the location string
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(job.location)}&key=YOUR_API_KEY`)
            .then(response => response.json())
            .then(geoData => {
              if (geoData.status === 'OK') {
                const location = geoData.results[0].geometry.location;
  
                const marker = new google.maps.Marker({
                  position: location,
                  map: map,
                  title: job.title
                });
  
                const infowindow = new google.maps.InfoWindow({
                  content: `<h3>${job.title}</h3>`
                });
  
                marker.addListener('click', () => {
                  infowindow.open(map, marker);
                });
              } else {
                console.error('Error geocoding location:', geoData.status);
              }
            })
            .catch(error => console.error('Error:', error));
        });
      })
      .catch(error => console.error('Error:', error));
  }
  