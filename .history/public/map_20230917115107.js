document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2); // Set initial center and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Fetch jobs data from your server
    fetch('/jobs')
        .then(response => response.json())
        .then(jobs => {
            jobs.forEach(job => {
                // Use geocoding API to get latitude and longitude for each job location
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${job.Location}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            const location = data[0];
                            L.marker([location.lat, location.lon]).addTo(map)
                                .bindPopup(job.title);
                        }
                    });
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});
