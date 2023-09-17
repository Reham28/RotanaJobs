document.addEventListener('DOMContentLoaded', () => {
    const mapFrame = document.getElementById('rotanaMap');

    // Construct the Google Maps URL dynamically
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBrvieYMzggsisfSJDbzEA2GNId7jGKxcU&zoom=6&maptype=roadmap`;

    // Set the iframe src attribute
    mapFrame.src = mapUrl;

    // Wait for the iframe to load
    mapFrame.onload = function() {
      const map = mapFrame.contentWindow.google.maps;
      const geocoder = new map.Geocoder();
      
      fetch('/jobs')
        .then(response => response.json())
        .then(data => {
          data.forEach(job => {
            geocoder.geocode({ address: job.location }, (results, status) => {
              if (status === 'OK' && results[0]) {
                const marker = new map.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: job.title
                });
              }
            });
          });
        })
        .catch(error => console.error('Error:', error));
    }
});
