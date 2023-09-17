/*let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 31.9632, lng: 35.9304 },
    zoom: 8
  });

  fetch('/jobs') // Assuming this endpoint returns job data in JSON format
    .then(response => response.json())
    .then(data => {
      data.forEach(job => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: job.location }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: job.title
            });
          }
          console.log(data);
        });
      });
    })
    .catch(error => console.error('Error:', error));
}
*/
document.addEventListener('DOMContentLoaded', () => {
    const mapFrame = document.getElementById('rotanaMap');

    // Create an array of job locations (you can fetch this dynamically)
    const jobLocations = [
      { title: 'Job Title 1', location: 'Amman, Jordan' },
      { title: 'Job Title 2', location: 'Dubai, UAE' },
      // Add more job locations as needed
    ];

    // Construct the Google Maps URL dynamically
    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBrvieYMzggsisfSJDbzEA2GNIc7jGKxcU&zoom=6&maptype=roadmap`;

    // Set the iframe src attribute
    mapFrame.src = mapUrl;

    // Wait for the iframe to load
    mapFrame.onload = function() {
      const map = mapFrame.contentWindow.google.maps;
      const geocoder = new map.Geocoder();

      // Loop through job locations and add markers
      jobLocations.forEach(job => {
        geocoder.geocode({ address: job.location }, (results, status) => {
          if (status === 'OK' && results[0]) {
            new map.Marker({
              position: results[0].geometry.location,
              map: mapFrame.contentWindow.map,
              title: job.title
            });
          }
        });
      });
    }
  });