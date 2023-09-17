document.addEventListener('DOMContentLoaded', () => {
    let map;
  
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2, // Set initial zoom level
        center: { lat: 0, lng: 0 }, // Set initial center to 0,0
      });
  
      fetch('/jobs') // Assuming this endpoint returns job data in JSON format
        .then(response => response.json())
        .then(data => {
          data.forEach(job => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: job.location }, (results, status) => {
              if (status === 'OK' && results[0]) {
                // Center the map on the country
                const countryLocation = results[0].geometry.location;
                map.setCenter(countryLocation);
  
                const marker = new google.maps.Marker({
                  position: countryLocation,
                  map: map,
                  title: job.title
                });
              }
            });
          });
        })
        .catch(error => console.error('Error:', error));
    }
  
    initMap();
  });
  