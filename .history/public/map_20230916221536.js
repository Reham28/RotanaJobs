function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 2
    });
  
    fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        const markers = []; // An array to store marker objects
  
        data.forEach(job => {
          const location = job.location;
          const title = job.title;
  
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title: title
              });
  
              const infowindow = new google.maps.InfoWindow({
                content: title
              });
  
              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });
  
              markers.push(marker); // Add marker to the array
            }
          });
        });
  
        // Adjust map bounds to fit all markers
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);
      })
      .catch(error => console.error('Error:', error));
  }
  