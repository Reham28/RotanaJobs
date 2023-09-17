let map;

document.addEventListener('DOMContentLoaded', function() {
    map = L.map('map').setView([25.276987, 55.296249], 7); // Set initial center and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Fetch jobs data from your server
    fetch('/jobs')
        .then(response => response.json())
        .then(jobs => {
            jobs.forEach(job => {
                L.marker([job.latitude, job.longitude]).addTo(map)
                    .bindPopup(job.title);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});
