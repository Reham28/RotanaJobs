document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([31.95, 35.93], 7); // Set Jordan as default center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Function to fetch jobs from the server based on a specific location
    function fetchJobsByLocation(location) {
        return fetch(`/jobs?location=${location}`)
            .then(response => response.json());
    }

    // Fetch jobs data from the server for Jordan and surrounding countries
    fetchJobsByLocation('Jordan')
        .then(jobs => {
            jobs.forEach(job => {
                L.marker([job.latitude, job.longitude]).addTo(map)
                    .bindPopup(job.title);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});
