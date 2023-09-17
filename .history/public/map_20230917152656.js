document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const jobsData = JSON.parse(localStorage.getItem('jobsData'));

    if (jobsData) {
        jobsData.forEach(job => {
            fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(location)}&apiKey=pwg-zBcTMUWCxFMmkRPXdw`)
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
