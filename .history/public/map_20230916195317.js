function initMap() {
    // This function is called when the Google Maps API is loaded and ready to use.
    // It serves as the entry point for setting up the map and markers.
  
    fetch('/jobs') // Fetch job data from the '/jobs' endpoint.
      .then(response => response.json()) // Parse the response as JSON.
      .then(data => {
        // Once the JSON data is received, this function handles it.
  
        const map = new google.maps.Map(document.getElementById('map'), {
          // Create a new Google Map and attach it to the HTML element with the ID 'map'.
          center: { lat: 0, lng: 0 }, // Set the initial center of the map (latitude and longitude).
          zoom: 2 // Set the initial zoom level of the map.
        });
  
        data.forEach(job => {
          // Iterate over each job in the data.
  
          const infowindow = new google.maps.InfoWindow({
            // Create an info window to display information when a marker is clicked.
            content: `<h3>${job.title}</h3><p>${job.location}</p>`
            // Set the content of the info window to the job title and location.
          });
  
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: job.location }, (results, status) => {
            // Use the Google Maps Geocoder to convert the job location to coordinates.
  
            if (status === 'OK' && results[0]) {
              // If geocoding is successful and results are returned.
  
              const marker = new google.maps.Marker({
                // Create a new marker at the geocoded coordinates.
                position: results[0].geometry.location, // Set the position of the marker.
                map: map, // Attach the marker to the map.
                title: job.title // Set the title of the marker (job title).
              });
  
              marker.addListener('click', () => {
                // Add an event listener to the marker to handle click events.
  
                infowindow.open(map, marker); // Open the info window when the marker is clicked.
              });
            }
          });
        });
      })
      .catch(error => console.error('Error:', error)); // Handle any errors during the fetch request.
  }
  