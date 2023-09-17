document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2); // Set initial center and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Fetch jobs data from your server
    fetch('/jobs')
        .then(response => response.json())
        .then(jobs => {
            const geocoder = new google.maps.Geocoder();

            // Function to geocode a location
            function geocodeLocation(location, callback) {
                geocoder.geocode({ address: location }, (results, status) => {
                    if (status === 'OK') {
                        const coordinates = results[0].geometry.location;
                        callback(null, coordinates);
                    } else {
                        callback(status, null);
                    }
                });
            }

            // Process each job and add it to the map
            jobs.forEach(job => {
                geocodeLocation(job.location, (error, coordinates) => {
                    if (!error) {
                        L.marker([coordinates.lat(), coordinates.lng()]).addTo(map)
                            .bindPopup(job.title);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});
