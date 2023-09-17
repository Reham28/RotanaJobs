let map;
let markers = []; // Array to store marker objects

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2
  });

  fetch('/jobs')
      .then(response => response.json())
      .then(data => {
        data.forEach(job => {
            const marker = new google.maps.Marker({
                position: job.location,
                map: map,
                title: job.title
              });
          
              markers.push(marker); // Add marker to array
        });
      })
      .catch(error => console.error('Error:', error));







  // Assuming you have 'jobs' data already populated
  // jobs should be an array of objects with 'title' and 'location' properties

  // Add markers for each job
  

  // Listen for map bounds changes
  map.addListener('bounds_changed', () => {
    const bounds = map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    // Update displayed markers based on visible bounds
    markers.forEach(marker => {
      const position = marker.getPosition();
      if (
        position.lat() >= southWest.lat() &&
        position.lat() <= northEast.lat() &&
        position.lng() >= southWest.lng() &&
        position.lng() <= northEast.lng()
      ) {
        marker.setVisible(true); // Marker is in view
      } else {
        marker.setVisible(false); // Marker is outside view
      }
    });
  });
}
