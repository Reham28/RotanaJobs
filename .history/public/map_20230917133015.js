document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([25.0, 45.0], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach(job => {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(job.location)}&key=384a8ef6928742569d2e38e2ebeeec08`)
                .then(response => response.json())
                .then(data => {
                    const location = data.results[0].geometry;
                    L.marker([location.lat, location.lng]).addTo(map)
                        .bindPopup(job.title);
                })
                .catch(error => console.error('Error fetching geolocation:', error));
        });
    }
});
